from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from typing import Annotated
from services import user_service
from dtos import user_dto
from models.user import User
from fastapi import HTTPException
from authentication.auth import authenticate_user, get_access_token, get_current_user

router = APIRouter()

db_dependency = Annotated[AsyncSession, Depends(get_db)]

@router.post("/register")
async def create(data: user_dto.User, db: db_dependency):
    print("HERE")
    user = await user_service.create_user(data, db)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = get_access_token(user)
    return {"token": token, 
            "user":
            {
                "id": user.id,
                "email": user.email,
                "role": user.role_id
            }
    }



@router.post("/login")
async def login(user_dto: user_dto.User, db: db_dependency):
    user: User = await authenticate_user(user_dto.email, user_dto.password, db)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token =get_access_token(user)
    return {"token": token, 
            "user":
            {
                "id": user.id,
                "email": user.email,
                "role": user.role_id
            }
    }

@router.post("/protected")
async def protected(user: User = Depends(get_current_user)):
    return user