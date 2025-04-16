from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from typing import List
from services import weapon_service
from dtos.weapon_dto import WeaponBase
router = APIRouter()
from models.user import User
from authentication.auth import get_current_user

@router.post("/")
async def create_weapon(weapon: WeaponBase, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    weapon.owner_id = user.id
    return await weapon_service.create_weapon(weapon, db)

@router.get("/")
async def get_weapons(db: AsyncSession = Depends(get_db)):
    print("Fetching all weapons")
    return await weapon_service.get_all_weapons(db)

@router.get("/{weapon_id}")
async def get_weapon(weapon_id: int, db: AsyncSession = Depends(get_db)):
    weapon = await weapon_service.get_weapon_by_id(weapon_id, db)
    if weapon is None:
        raise HTTPException(status_code=404, detail="Weapon not found")
    return weapon

# @router.put("/{weapon_id}")
# async def update_weapon(weapon_id: int, weapon: WeaponUpdate, db: AsyncSession = Depends(get_db)):
    # updated_weapon = await weapon_service.update_weapon(weapon_id, weapon, db)
    # if updated_weapon is None:
        # raise HTTPException(status_code=404, detail="Weapon not found")
    # return updated_weapon

@router.delete("/{weapon_id}")
async def delete_weapon(weapon_id: int, db: AsyncSession = Depends(get_db)):
    if not await weapon_service.delete_weapon(weapon_id, db):
        raise HTTPException(status_code=404, detail="Weapon not found")
    return {"message": "Weapon deleted successfully"}
