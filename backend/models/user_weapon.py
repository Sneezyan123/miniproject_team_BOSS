from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

user_weapon = Table(
    "user_weapon",
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("weapon_id", Integer, ForeignKey("weapons.id"))
)