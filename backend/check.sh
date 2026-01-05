#!/bin/bash

# Script to run all code quality checks locally
# Usage: ./check.sh

set -e

echo "🔍 Running code quality checks..."

# Check if we're in a virtual environment
if [[ -z "$VIRTUAL_ENV" ]]; then
    echo "⚠️  Warning: Not in a virtual environment"
    echo "   Activate venv first: source venv/bin/activate"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dev dependencies if needed
if ! command -v ruff &> /dev/null; then
    echo "📦 Installing dev dependencies..."
    pip install ruff mypy types-requests
fi

echo ""
echo "1️⃣  Running ruff (linting)..."
ruff check . || {
    echo "❌ Ruff found issues. Run 'ruff check . --fix' to auto-fix some issues."
    exit 1
}

echo ""
echo "2️⃣  Checking code formatting..."
ruff format --check . || {
    echo "❌ Code formatting issues found. Run 'ruff format .' to fix."
    exit 1
}

echo ""
echo "3️⃣  Running mypy (type checking)..."
# Mypy will use exclude patterns from pyproject.toml which includes .gitignore patterns
mypy . --ignore-missing-imports --explicit-package-bases || {
    echo "⚠️  Mypy found type issues (non-blocking)"
}

echo ""
echo "4️⃣  Checking syntax..."
python -m py_compile main.py
python -m py_compile Features/LLM/llm_engine.py
python -m py_compile Features/DogRecognition/dog_recognition.py
python -m py_compile Core/router.py

echo ""
echo "✅ All checks passed!"
