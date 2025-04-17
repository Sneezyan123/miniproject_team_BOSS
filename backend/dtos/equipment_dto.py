from pydantic import BaseModel
from models.equipment import PurposeEnum

class EquipmentBase(BaseModel):
    name: str
    img_url: str = "undefined"
    description: str
    purpose: PurposeEnum
    owner_id: str = None
