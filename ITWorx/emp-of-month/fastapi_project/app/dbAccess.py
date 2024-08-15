from models import User 



async def get_user_by_email(email: str):
   database = Database()
   query = "SELECT * FROM users WHERE email = :email"
   values = {"email": email}
   user = await database.fetch_one(query, values)
   if user:
        return User(**user)
   return None
    