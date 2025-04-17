from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models.request import RequestStatus

class RequestCreate(BaseModel):
    equipment_name: str
    quantity: int
    description: Optional[str] = None

class RequestUpdate(BaseModel):
    status: RequestStatus

class RequestResponse(BaseModel):
    id: int
    equipment_name: str
    quantity: int
    description: Optional[str]
    status: RequestStatus
    created_at: datetime
    updated_at: datetime
    user_id: int
