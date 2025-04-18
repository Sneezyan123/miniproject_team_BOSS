from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models.request import RequestStatus, RequestPriority

class RequestCreate(BaseModel):
    equipment_id: int
    quantity: int
    description: Optional[str] = None
    priority: RequestPriority = RequestPriority.medium

class RequestUpdate(BaseModel):
    status: RequestStatus

class RequestResponse(BaseModel):
    id: int
    equipment_id: int
    quantity: int
    description: Optional[str]
    priority: RequestPriority
    status: RequestStatus
    created_at: datetime
    updated_at: datetime
    user_id: int
    equipment_name: str
