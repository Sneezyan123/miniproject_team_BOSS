from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database.database import Base
from enum import Enum as PyEnum

class PurposeEnum(PyEnum):
    weapon = "weapon"
    humanitarian = "humanitarian" 
    vehicle = "vehicle"

class Equipment(Base):
    __tablename__ = "equipment"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, unique=True, index=True)
    img_url = Column(String)
    description = Column(String)
    purpose = Column(Enum(PurposeEnum), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="equipment")
