# from sqlalchemy import Column, Integer, String, ForeignKey
# from sqlalchemy.orm import relationship
# from database.database import Base
# class Weapon(Base):
#     __tablename__ = "weapons"
#     id = Column(Integer, primary_key=True, index=True, autoincrement=True)
#     name = Column(String, unique=True, index=True)
#     description = Column(String)
#     user = relationship("User", back_populates="weapons")
#     user_id = Column(Integer, ForeignKey('users.id'))
