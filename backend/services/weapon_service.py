from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from models.weapon import Weapon
from dtos.weapon_dto import WeaponBase
async def create_weapon(weapon: WeaponBase, db: AsyncSession):
    db_weapon = Weapon(**weapon.model_dump())
    db.add(db_weapon)
    await db.commit()
    await db.refresh(db_weapon)
    return db_weapon

async def get_all_weapons(db: AsyncSession):
    result = await db.execute(select(Weapon))
    return result.scalars().all()

async def get_weapon_by_id(weapon_id: int, db: AsyncSession):
    result = await db.execute(select(Weapon).where(Weapon.id == weapon_id))
    return result.scalar_one_or_none()

# async def update_weapon(weapon_id: int, weapon: WeaponUpdate, db: AsyncSession):
#     query = update(Weapon).where(Weapon.id == weapon_id).values(**weapon.model_dump())
#     await db.execute(query)
#     await db.commit()
#     return await get_weapon_by_id(weapon_id, db)

async def delete_weapon(weapon_id: int, db: AsyncSession):
    query = delete(Weapon).where(Weapon.id == weapon_id)
    await db.execute(query)
    await db.commit()
    return True

async def get_weapons_by_user_id(user_id: int, db: AsyncSession):
    result = await db.execute(select(Weapon).where(Weapon.owner_id == user_id))
    return result.scalars().all()