from pydantic import BaseModel

class WeaponBase(BaseModel):
    name: str
    img_url: str = "undefined"
    description: str
    owner_id: str = None
