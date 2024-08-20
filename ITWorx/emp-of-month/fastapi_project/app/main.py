from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from datetime import timedelta
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret key for session encryption
SECRET_KEY = "abc"  # Replace with your actual secret key

# Add SessionMiddleware to your FastAPI app
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:432002@localhost:5432/postgres"
engine = create_engine("postgresql://postgres:432002@localhost:5432/postgres")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# db = SessionLocal()
# try:
#     result = db.execute(text("SELECT * FROM public.employee")).fetchall()
#     print('success')
# except Exception as e:
#     print(str(e))
# finally:

#     db.close()

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


def authenticate_user(db: Session, username: str, password: str):
    try:
        # Query to find the user by username (or email)
        result = db.execute(
            text("""
                SELECT userid, email, password, isadmin 
                FROM employee 
                WHERE email = :username
            """),
            {"username": username}
        ).fetchone()

        print(result)
        if result:
            user_id, email, db_password, isadmin = result

        # print(user_id, " ",email, " ",db_password)
            # Compare the provided password with the one in the database
        if password == db_password:
                # print(user_id, " ",email, " ",db_password)

                return {"userid": user_id, "username": email, "isadmin": isadmin}
        else:
                return None  # Password is incorrect
        return None  # User not found

    except Exception as e:
        print(f"Error during authentication: {str(e)}")
        return None


async def get_user_by_email(email: str):
    # Implement the logic to retrieve a user from the database by their email
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT * FROM employee WHERE email = :email"), {"email": email}).fetchone()
        if result:
            return result
        return None
    finally:
        db.close()

# Define the create_access_token function
async def create_access_token(data: dict, expires_delta: timedelta):
    # Implement the logic to create an access token for the user
    return "token"

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.post("/login")
async def login(request: Request):
    
    db = SessionLocal()

    form = await request.form()
    email = form.get("email")
    print(email)
 
    password = form.get("password")
    print(password)
    user = authenticate_user(db, email, password)
    print(user)
    db.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    print("153")

    # Store user ID in session
 
    request.session['user_id'] = user['userid']
    request.session['is_admin'] = user['isadmin']
    print("Session data set:", request.session.get('user_id'), request.session.get('is_admin'))

    

    print("157")

    db = SessionLocal()
    try:
        result = db.execute(text("SELECT * FROM employee WHERE email = :email and isadmin = True"), {"email": email}).fetchone()
        if result:
                print("157")
                response = RedirectResponse(url="http://localhost:3000/admin" if user['isadmin'] else "http://localhost:3000/emp", status_code=302)
                response.set_cookie("session_id", request.session, secure=True, httponly=True)                
                return response
                # return RedirectResponse(url="http://localhost:3000/admin", status_code=302)

        print("157")
        response = RedirectResponse(url="http://localhost:3000/emp" if user['isadmin'] else "http://localhost:3000/emp", status_code=302)
        response.set_cookie("session_id", request.session, secure=True, httponly=True)        
        return response
        # return RedirectResponse(url="http://localhost:3000/emp", status_code=302)
    finally:
        db.close()



@app.get("/session")
# async def get_session(request: Request):
#     user_id = request.session.get("user_id")
#     is_admin = request.session.get("is_admin")
#     print(user_id,is_admin)
#     return {"user_id": user_id, "is_admin": is_admin}
async def get_session(request: Request):
    user_id = request.session.get("user_id")
    is_admin = request.session.get("is_admin")
    response = JSONResponse(content={"user_id": user_id, "is_admin": is_admin}, status_code=200)
    response.set_cookie("session_id", request.session, secure=True, httponly=True)
    return response

@app.post("/add_nominee")
async def add_nominee(name: str):
    db = SessionLocal()
    try:
        existing_nominee = db.execute(text("SELECT * FROM nominees WHERE name = :name"), {"name": name}).fetchone()
        if existing_nominee:
            raise HTTPException(status_code=400, detail="Nominee already exists")

        db.execute(text("INSERT INTO nominees (name) VALUES (:name)"), {"name": name})
        db.commit()
        return JSONResponse(content={"message": "Nominee added successfully"}, status_code=201)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/view_nominees")
async def view_nominees():
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT nomineemail FROM nominee")).fetchall()
        nominees = [row['email'] for row in result]
        return JSONResponse(content={"nominees": nominees}, status_code=200)
    finally:
        db.close()


@app.get("/view_previous_winners")
async def view_previous_winners():
    db = SessionLocal()  # Create a new database session

    try:
        # Execute the query to get the top three winners with the highest "month" values
        result = db.execute(
             text("""
                SELECT * 
                FROM resultofmonth 
                ORDER BY "month" DESC 
                LIMIT 3
            """)
        ).fetchall()

        if result:
            # Convert result to a list of dictionaries
            winners = [dict(row) for row in result]
            return JSONResponse(content={"winners": winners}, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="No winners found")
    except Exception as e:
        # Print the error for debugging purposes
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while retrieving winners")
    finally:
        db.close()  # Ensure the database session is closed


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

   
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/view_results")
async def view_results():
    # Implement the logic to retrieve the result from the database
    result = [...]  # retrieve result from database
    return JSONResponse(content={"result": result}, status_code=200)

@app.put("/vote/{id}")
async def vote(id: int, request: Request, db: Session = Depends(get_db) ):
    # Get the voter's ID from the session
    voter_id = request.session.get('user_id')
    db= SessionLocal()
    
    if not voter_id:
        raise HTTPException(status_code=401, detail="User not logged in")

    try:
        # Check if the voter has already voted
        result = db.execute(
            text("""
                SELECT voted 
                FROM employee 
                WHERE userid = :voter_id
            """),
            {"voter_id": voter_id}
        ).fetchone()

        if result and result[0]:
            raise HTTPException(status_code=403, detail="User has already voted")

        # Update the voting table to register the vote
        db.execute(
            text("""
                UPDATE votings 
                SET numberofvotes = numberofvotes + 1 
                WHERE votedid = :id
            """),
            {"id": id}
        )

        # Mark the voter as having voted
        db.execute(
            text("""
                UPDATE employee 
                SET voted = TRUE 
                WHERE userid = :voter_id
            """),
            {"voter_id": voter_id}
        )

        # Commit the transaction
        db.commit()

        # return JSONResponse(content={"message": "Vote registered"}, status_code=200)

    except Exception as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail="An error occurred while voting")

    finally:
        db.close()

@app.put("/end_voting")
async def end_voting():
    # Implement the logic to end the voting
    return JSONResponse(content={"message": "Voting has ended"}, status_code=200)

@app.post("/logout")
async def logout(request: Request):
   if 'user_id' not in request.session:
        raise HTTPException(status_code=401, detail="User not logged in")
    
    # Clear the session
   request.session.clear()
    
    # Redirect to a home or login page after logout
   return RedirectResponse(url="/login", status_code=302)








