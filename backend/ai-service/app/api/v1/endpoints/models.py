from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List, Optional
from pydantic import BaseModel
from app.core.database import get_db
from app.models.model import Model
from app.schemas.model import ModelCreate, ModelUpdate, ModelResponse
from app.services.model_service import ModelService
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/", response_model=List[ModelResponse])
async def get_models(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all models with pagination"""
    model_service = ModelService(db)
    models = model_service.get_models(skip=skip, limit=limit)
    return models

@router.get("/{model_id}", response_model=ModelResponse)
async def get_model(
    model_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific model by ID"""
    model_service = ModelService(db)
    model = model_service.get_model(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@router.post("/", response_model=ModelResponse)
async def create_model(
    model_data: ModelCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Create a new model"""
    model_service = ModelService(db)
    model = model_service.create_model(model_data)
    
    # Start model initialization in background
    background_tasks.add_task(model_service.initialize_model, model.id)
    
    return model

@router.put("/{model_id}", response_model=ModelResponse)
async def update_model(
    model_id: str,
    model_data: ModelUpdate,
    db: Session = Depends(get_db)
):
    """Update a model"""
    model_service = ModelService(db)
    model = model_service.update_model(model_id, model_data)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@router.delete("/{model_id}")
async def delete_model(
    model_id: str,
    db: Session = Depends(get_db)
):
    """Delete a model"""
    model_service = ModelService(db)
    success = model_service.delete_model(model_id)
    if not success:
        raise HTTPException(status_code=404, detail="Model not found")
    return {"message": "Model deleted successfully"}

@router.post("/{model_id}/deploy")
async def deploy_model(
    model_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Deploy a model for inference"""
    model_service = ModelService(db)
    model = model_service.get_model(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    
    # Start deployment in background
    background_tasks.add_task(model_service.deploy_model, model_id)
    
    return {"message": "Model deployment started"}

@router.post("/{model_id}/undeploy")
async def undeploy_model(
    model_id: str,
    db: Session = Depends(get_db)
):
    """Undeploy a model"""
    model_service = ModelService(db)
    success = model_service.undeploy_model(model_id)
    if not success:
        raise HTTPException(status_code=404, detail="Model not found")
    return {"message": "Model undeployed successfully"}
