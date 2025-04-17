from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from models.equipment import Equipment
from dtos.equipment_dto import EquipmentBase

async def create_equipment(equipment: EquipmentBase, db: AsyncSession):
    db_equipment = Equipment(**equipment.model_dump())
    db.add(db_equipment)
    await db.commit()
    await db.refresh(db_equipment)
    return db_equipment

async def get_all_equipment(db: AsyncSession):
    result = await db.execute(select(Equipment))
    return result.scalars().all()

async def get_equipment_by_id(equipment_id: int, db: AsyncSession):
    result = await db.execute(select(Equipment).where(Equipment.id == equipment_id))
    return result.scalar_one_or_none()

async def delete_equipment(equipment_id: int, db: AsyncSession):
    query = delete(Equipment).where(Equipment.id == equipment_id)
    await db.execute(query)
    await db.commit()
    return True

async def get_equipment_by_user_id(user_id: int, db: AsyncSession):
    result = await db.execute(select(Equipment).where(Equipment.owner_id == user_id))
    return result.scalars().all()
