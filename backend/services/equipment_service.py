from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from models.equipment import Equipment
from dtos.equipment_dto import EquipmentBase

from openai import OpenAI
import openai
import requests
from config import settings

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

async def get_free_equipment(db: AsyncSession):
    result = await db.execute(select(Equipment).where(Equipment.owner_id == None))
    return result.scalars().all()

async def generate_ai_description(name: str, purpose: str) -> str:
    try:
        api_key = settings.FACE_API_KEY
        api_url = settings.FACE_API_URL
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload={
            "messages": [
                {
                    "role": "user",
                    "content": f"Generate a description for military equipment with the following details:\nName: {name}\nPurpose: {purpose} in Ukrainian language. First of all, write small general information then characteristics, then write about the purpose of the equipment."
                }
            ],
            "model": "deepseek/deepseek-v3-0324",
        }
        response = requests.post(api_url, headers=headers, json=payload)
        return response.json().get("choices")[0].get("message").get("content")
    except Exception as e:
        raise Exception(f"Failed to generate AI description: {str(e)}")

async def update_equipment(equipment_id: int, equipment: EquipmentBase, db: AsyncSession):
    result = await db.execute(
        select(Equipment).where(Equipment.id == equipment_id)
    )
    db_equipment = result.scalar_one_or_none()
    if db_equipment:
        for key, value in equipment.model_dump(exclude_unset=True).items():
            setattr(db_equipment, key, value)
        await db.commit()
        await db.refresh(db_equipment)
    return db_equipment