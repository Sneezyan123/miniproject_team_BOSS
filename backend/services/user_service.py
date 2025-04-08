from models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from dtos import user_dto
from database.database import get_db
from fastapi import Depends
from models.role import RoleEnum
from services.hash import hash_password
from sqlalchemy import select

async def create_user(user: user_dto.User, db: AsyncSession = Depends(get_db)):
    isUser = await get_user_by_email(user.email, db)
    if isUser:
        return None
    role_id = 2 if user.role == RoleEnum.user else 1
    new_user = User(email=user.email,
                    password=hash_password(user.password),
                    role_id=role_id)
    try:
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
    except Exception as e:
        print(e)
    return new_user

async def get_user_by_id(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == id))
    return result.scalars().first()

async def get_user_by_email(email: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == email))
    return result.scalars().first()