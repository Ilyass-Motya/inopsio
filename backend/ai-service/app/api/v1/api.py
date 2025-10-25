from fastapi import APIRouter
from app.api.v1.endpoints import models, inference, training, evaluation

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(models.router, prefix="/models", tags=["models"])
api_router.include_router(inference.router, prefix="/inference", tags=["inference"])
api_router.include_router(training.router, prefix="/training", tags=["training"])
api_router.include_router(evaluation.router, prefix="/evaluation", tags=["evaluation"])
