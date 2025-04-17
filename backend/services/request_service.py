from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.request import EquipmentRequest, RequestStatus
from dtos.request_dto import RequestCreate

async def create_request(request: RequestCreate, user_id: int, db: AsyncSession):
    db_request = EquipmentRequest(
        user_id=user_id,
        equipment_name=request.equipment_name,
        quantity=request.quantity,
        description=request.description
    )
    db.add(db_request)
    await db.commit()
    await db.refresh(db_request)
    return db_request

async def get_user_requests(user_id: int, db: AsyncSession):
    result = await db.execute(
        select(EquipmentRequest).where(EquipmentRequest.user_id == user_id)
    )
    return result.scalars().all()

async def get_pending_requests(db: AsyncSession):
    result = await db.execute(
        select(EquipmentRequest).where(EquipmentRequest.status == RequestStatus.pending)
    )
    return result.scalars().all()

async def update_request_status(request_id: int, status: RequestStatus, db: AsyncSession):
    result = await db.execute(
        select(EquipmentRequest).where(EquipmentRequest.id == request_id)
    )
    request = result.scalar_one_or_none()
    if request:
        request.status = status
        await db.commit()
        await db.refresh(request)
    return request
