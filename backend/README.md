# Backend API

FastAPI backend for dog recognition project.

## Requirements

- Python 3.12.8 (see `.python-version`)
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

- `GET /` - Health check endpoint
- `GET /api/dog-advice?breed=<breed_name>` - Get breed-specific advice
- `POST /api/dog-from-photo` - Upload photo to recognize dog breed and get advice

### Example Requests

**Get breed advice:**
```bash
curl "http://localhost:8000/api/dog-advice?breed=Golden%20Retriever"
```

**Upload photo:**
```bash
curl -X POST "http://localhost:8000/api/dog-from-photo" \
  -F "file=@dog_photo.jpg"
```

## Project Structure

```
backend/
├── Core/              # Core components
├── Features/          # Feature modules
│   ├── DogRecognition/  # Dog recognition model
│   └── LLM/            # LLM engine for advice generation
├── main.py            # FastAPI entry point
├── requirements.txt   # Python dependencies
├── setup.sh           # Project setup script
├── check.sh           # Code quality check script
├── pyproject.toml     # Ruff and mypy configuration
├── Dockerfile          # Docker configuration for deployment
├── fly.toml           # Fly.io configuration
└── .dockerignore       # Docker ignore patterns
```

## Code Quality

### Running Checks Locally

Run all code quality checks:

```bash
./check.sh
```

This will run:
- **ruff** - Linting and code formatting checks
- **mypy** - Type checking (non-blocking)
- **Syntax validation** - Compile check for all Python files

### Manual Checks

Format code:
```bash
ruff format .
```

Fix linting issues:
```bash
ruff check . --fix
```

Type checking:
```bash
mypy . --ignore-missing-imports
```

## CI/CD

### Continuous Integration

GitHub Actions automatically runs checks on push and pull requests:
- **Linting** (ruff) - Code style and quality checks
- **Code formatting** (ruff format) - Formatting validation
- **Type checking** (mypy) - Static type analysis
- **Syntax validation** - Python compilation checks
- **Import checks** - Import sorting and validation

See `.github/workflows/backend-ci.yml` for details.

### Continuous Deployment

Automatic deployment to Fly.io is triggered on:
- Push of tags matching `backend/v*` or `v*` (e.g., `backend/v1.0.0` or `v1.0.0`)

See [Deployment to Fly.io](#deployment-to-flyio) section for details.

### Deployment to Fly.io

The backend is automatically deployed to Fly.io when tags are pushed:
- Tags matching `backend/v*` (e.g., `backend/v1.0.0`)
- Tags matching `v*` (e.g., `v1.0.0`)

**Initial Setup:**

1. Install Fly.io CLI:
```bash
curl -L https://fly.io/install.sh | sh
```

2. Login to Fly.io:
```bash
flyctl auth login
```

3. Create a new app (if not already created):
```bash
cd backend
flyctl launch
```

4. Set up secrets:
```bash
flyctl secrets set HF_TOKEN=your_huggingface_token_here
```

5. Add Fly.io API token to GitHub Secrets:
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Add `FLY_API_TOKEN` with your Fly.io API token
   - Get token: `flyctl auth token`

**Releasing a New Version:**

1. **Create and push a tag** (recommended approach):
```bash
# From main branch after your changes are merged
git tag backend/v1.0.0
git push origin backend/v1.0.0
# Or use semantic versioning tag
git tag v1.0.0
git push origin v1.0.0
# Deployment will start automatically
```

2. **Create a GitHub Release** (optional but recommended):
   - Go to GitHub repository → Releases → Create a new release
   - Choose the tag you just created
   - Add release notes describing changes
   - This creates a permanent record of the release

**Tag Naming:**
- Use semantic versioning: `v1.0.0`, `v1.1.0`, `v2.0.0`
- Prefixed tags: `backend/v1.0.0` (for backend-specific releases)
- Both formats are supported

**Manual Deployment:**

- Via GitHub Actions: Use "Deploy Backend to Fly.io" workflow
- Via CLI:
  ```bash
  cd backend
  flyctl deploy
  ```

**Configuration:**

- Region: Amsterdam (`ams`) - European region on free tier
- See `fly.toml` for deployment configuration
- See `.github/workflows/backend-deploy.yml` for CI/CD workflow

## Python Version

Python version is fixed in `.python-version` file.

If you have `pyenv` installed, it will automatically use this version:
```bash
pyenv install $(cat .python-version)
pyenv local $(cat .python-version)
```
