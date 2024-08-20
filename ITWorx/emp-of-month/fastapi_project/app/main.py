from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from datetime import timedelta
from datetime import datetime


app = FastAPI()

SQLALCHEMY_DATABASE_URL = "postgresql://user:user@localhost:5432/postgres"
engine = create_engine("postgresql://user:user@localhost:5432/postgres")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()
try:
    result = db.execute(text("SELECT * FROM public.employee")).fetchall()
    print('success')
except Exception as e:
    print(str(e))
finally:

    db.close()

# try:
#     # SQL INSERT query
#     insert_query = text("""
#         INSERT INTO public.employee (name, email, password, isadmin)
#         VALUES (:name, :email, :password, :isadmin)
#     """)

#     # Execute the query with parameters
#     db.execute(insert_query, {
#         'name': 'nourrr',
#         'email': 'nourrr@nour',
#         'password': '12345',
#         'isadmin': False
#     })

#     # Commit the transaction
#     db.commit()
#     print('Insert successful')

# except Exception as e:
#     print(f"Error: {str(e)}")

# finally:
#     db.close()


# # UPDATE QUERY
# try:
#     # SQL UPDATE query
#     update_query = text("""
#         UPDATE public.employee
#         SET voted = :voted
#         WHERE email = :email
#     """)

#     # Execute the query with parameters
#     db.execute(update_query, {
#         'voted': True,
#         'email': 'nour@nour'
#     })

#     # Commit the transaction
#     db.commit()
#     print('Update successful')

# except Exception as e:
#     print(f"Error: {str(e)}")

# finally:
#     db.close()


# try:
#     # SQL INSERT query
#     insert_query = text("""
#          INSERT INTO public.employee (name, email, password, isadmin)
#          VALUES (:name, :email, :password, :isadmin)
#      """)

#      # Execute the query with parameters
#     db.execute(insert_query, {
#         'name': 'mohamedsherif',
#          'email': 'mohsherif@icloud',
#          'password': '1234511',
#          'isadmin': False
#      })

# #     # Commit the transaction
#     db.commit()
#     print('Insert successful')

# except Exception as e:
#      print(f"Error: {str(e)}")
try:
        # Fetch the results and nominees with mappings to get dictionaries directly
        results = db.execute(text("SELECT * FROM resultofmonth")).mappings().all()
        nominees_list = db.execute(text("SELECT * FROM nominations")).mappings().all()

        if results or nominees_list:
            return JSONResponse(content={"results": results, "nominees": nominees_list}, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="No results or nominees found")
except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while retrieving results")
finally:
        db.dispose()




try:
    # Execute the query to get all results
    result = db.execute(
        text("""
            SELECT * 
            FROM resultofmonth 
        """)
    ).fetchall()

    if result:
        # Convert result to a list of dictionaries
        results = [
            {key: value for key, value in row.items()} 
            for row in result
        ]
        print(results)
    else:
        raise HTTPException(status_code=404, detail="No results found")
except Exception as e:
    # Print the error for debugging purposes
    print(f"Error: {e}")
    raise HTTPException(status_code=500, detail="An error occurred while retrieving results")
finally:
    db.close()
# Define the create_access_token function
async def create_access_token(data: dict, expires_delta: timedelta):
    # Implement the logic to create an access token for the user
    return "token"



ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.post("/login")
async def login_user(email: str, password: str):
    user = await get_user_by_email(email)
    if not user or user['password'] != password:
        return JSONResponse(content={"error": "Invalid email or password"}, status_code=401)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    return JSONResponse(content={"access_token": access_token, "token_type": "bearer"}, status_code=200)




@app.post("/add_nominee")
async def add_nominee(name: str , numberofvotes):
    db = SessionLocal()
    try:
        
        existing_nominee = db.execute(
    text("SELECT * FROM nominations WHERE nomineemail = :email"),{"email": email}).fetchone()
        if existing_nominee:
             raise HTTPException(status_code=400, detail="Nominee already exists")

        
        db.execute(text("INSERT INTO nominations (nomineemail,reason,month) VALUES (:email,:reason,:month)"), {"email": email,"reason":reason, "month":current_month})
        db.commit()

        user = db.execute(text("SELECT userid FROM public.employee WHERE name = :name"), {"name": name}).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        
        user_id = user.userid
        current_month = datetime.now().month
        voted_id = f"{user_id}-{current_month}-{datetime.now().strftime('%Y%m%d%H%M%S%f')}"
        db.execute(text("INSERT INTO votings (votedid, month, numberofvotes) VALUES (:votedid, :month, :numberofvotes)"),
                   {"votedid": voted_id, "month": current_month, "numberofvotes": numberofvotes})
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        db.close()
        
@app.get("/view_nominees")
async def view_nominees():
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT name FROM nominees")).fetchall()
        nominees = [row['name'] for row in result]
        return JSONResponse(content={"nominees": nominees}, status_code=200)
    finally:
        db.close()

@app.get("/view_previous_winners")
async def view_previous_winners():
    # Implement the logic to retrieve the list of previous winners from the database
    winners = [...]  # retrieve list of previous winners from database
    return JSONResponse(content={"winners": winners}, status_code=200)


@app.get("/view_nominee_profile/{nominee_email}")
async def view_nominee_profile(nominee_email: str):
    
    db = SessionLocal()

    try:
        result = db.execute(
    text("""
        SELECT * 
        FROM employee e 
        JOIN nominations n ON n.nomineemail = e.email 
        WHERE n.nomineemail = :nominee_email
    """),
    {"nominee_email": "nour@nour"}
).fetchone()        
        print('success')
        if result:
            print(content={"nominee_profile": dict(result)}) 
        else:
            raise HTTPException(status_code=404, detail="Nominee not found")
    except Exception as e:
        print(str(e))
    finally:

        db.close()

   

@app.get("/view_results")
async def view_results():
    try:
        # Fetching data from the database
        result = db.execute(text("SELECT * FROM resultofmonth")).fetchall()
        nominees = db.execute(text("SELECT * FROM nominations")).fetchall()

        if result or nominees:
            # Convert the data to the appropriate format
            results = [dict(row) for row in result]
            nominees_list = [dict(row) for row in nominees]
            return JSONResponse(content={"results": results, "nominees": nominees_list}, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="No results or nominees found")
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while retrieving results")
    finally:
        db.close()
@app.post("/end_voting")
async def end_voting():
    # Implement the logic to end the voting
    return JSONResponse(content={"message": "Voting has ended"}, status_code=200)

@app.post("/logout")
async def logout():
    # Implement the logic to log out the user
    return JSONResponse(content={"message": "Logged out successfully"}, status_code=200)
