from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from services import request_service
from dtos.request_dto import RequestCreate, RequestUpdate, RequestResponse
from models.user import User
from authentication.auth import get_current_user
from models.role import RoleEnum

router = APIRouter()

@router.post("/", response_model=RequestResponse)
async def create_request(
    request: RequestCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await request_service.create_request(request, current_user.id, db)

@router.get("/my", response_model=list[RequestResponse])
async def get_my_requests(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await request_service.get_user_requests(current_user.id, db)

@router.get("/pending", response_model=list[RequestResponse])
async def get_pending_requests(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role.name != RoleEnum.logistician:
        raise HTTPException(status_code=403, detail="Not authorized")
    return await request_service.get_pending_requests(db)

@router.put("/{request_id}", response_model=RequestResponse)
async def update_request_status(
    request_id: int,
    request_update: RequestUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role.name != RoleEnum.logistician:
        raise HTTPException(status_code=403, detail="Not authorized")
    return await request_service.update_request_status(request_id, request_update.status, db)
