# Backend API

FastAPI backend for dog recognition project.

## Requirements

- Python 3.14.2 (recommended)
- pip

## Setup

### Automatic Setup

Run the setup script:

```bash
./setup.sh
```

The script will automatically:
- Check Python version
- Create a virtual environment `venv`
- Install all dependencies from `requirements.txt`

### Manual Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
```

2. Activate the virtual environment:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## Running

1. Make sure the virtual environment is activated:
```bash
source venv/bin/activate
```

2. Create a `.env` file with your HuggingFace token:
```bash
echo "HF_TOKEN=your_token_here" > .env
```

3. Start the server:
```bash
uvicorn main:app --reload
```

The server will be available at: http://localhost:8000

## API Endpoints

- `GET /` - Health check
- `GET /api/dog-advice?breed=<breed_name>` - Get breed advice
- `POST /api/dog-from-photo` - Recognize breed from photo

## Project Structure

```
backend/
├── Core/              # Core components
├── Features/          # Feature modules
│   ├── DogRecognition/  # Dog recognition model
│   └── LLM/            # LLM engine for advice generation
├── main.py            # FastAPI entry point
├── requirements.txt   # Python dependencies
└── setup.sh          # Project setup script
```

## Python Version

Python version is fixed in `.python-version` file (3.14.2).

If you have `pyenv` installed, it will automatically use this version:
```bash
pyenv install 3.14.2
pyenv local 3.14.2
```
