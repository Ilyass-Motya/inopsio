from pydantic_settings import BaseSettings
from typing import List, Optional
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "Inopsio AI Service"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql://inopsio:inopsio_dev@localhost:5432/inopsio"
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["localhost", "127.0.0.1", "*.inopsio.com"]
    
    # AI/ML Settings
    MODEL_CACHE_DIR: str = "./models"
    MAX_MODEL_SIZE: int = 1024 * 1024 * 1024  # 1GB
    INFERENCE_TIMEOUT: int = 30
    
    # Monitoring
    PROMETHEUS_PORT: int = 9090
    LOG_LEVEL: str = "INFO"
    
    # External Services
    GATEWAY_URL: str = "http://localhost:8000"
    AUTH_SERVICE_URL: str = "http://localhost:3001"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
