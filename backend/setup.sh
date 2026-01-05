#!/bin/bash

# Setup script for backend Python project
# This script creates a virtual environment and installs dependencies

set -e  # Exit on error

echo "🐍 Setting up Python backend environment..."

# Read required Python version from .python-version
REQUIRED_VERSION=$(cat .python-version 2>/dev/null | tr -d '[:space:]' || echo "3.12.8")

if [ -z "$REQUIRED_VERSION" ]; then
    echo "❌ Error: .python-version file is empty or missing"
    exit 1
fi

echo "📌 Required Python version: $REQUIRED_VERSION"

# Check if pyenv is installed
if ! command -v pyenv &> /dev/null; then
    echo "⚠️  pyenv is not installed"
    echo "   Installing pyenv..."
    
    # Try to install pyenv via common methods
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            echo "   Installing pyenv via Homebrew..."
            brew install pyenv
        else
            echo "❌ Error: pyenv is required but not installed"
            echo "   Please install pyenv: https://github.com/pyenv/pyenv#installation"
            exit 1
        fi
    else
        echo "❌ Error: pyenv is required but not installed"
        echo "   Please install pyenv: https://github.com/pyenv/pyenv#installation"
        exit 1
    fi
fi

# Initialize pyenv
eval "$(pyenv init -)"

# Check if the required Python version is installed
if ! pyenv versions --bare | grep -q "^$REQUIRED_VERSION$"; then
    echo "📥 Python $REQUIRED_VERSION is not installed via pyenv"
    echo "   Installing Python $REQUIRED_VERSION via pyenv..."
    pyenv install "$REQUIRED_VERSION"
fi

# Set local Python version
echo "🔧 Setting local Python version to $REQUIRED_VERSION..."
pyenv local "$REQUIRED_VERSION"

# Verify Python version
PYTHON_CMD=$(pyenv which python)
INSTALLED_VERSION=$($PYTHON_CMD --version 2>&1 | awk '{print $2}')

echo "✅ Using Python $INSTALLED_VERSION from pyenv"

# Create virtual environment
if [ -d "venv" ]; then
    echo "📦 Virtual environment already exists"
    read -p "Remove existing venv and recreate? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Removing existing venv..."
        rm -rf venv
    else
        echo "✅ Using existing venv"
    fi
fi

if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    $PYTHON_CMD -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "To activate the virtual environment, run:"
echo "  source venv/bin/activate"
echo ""
echo "To run the backend server:"
echo "  uvicorn main:app --reload"
echo ""
