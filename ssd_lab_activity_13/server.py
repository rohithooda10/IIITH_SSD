from flask import Flask
from flask import request, jsonify
import sqlite3

connection = sqlite3.connect('database.db')
connection.row_factory = sqlite3.Row
with open('schema.sql') as f:
    connection.executescript(f.read())

app = Flask(__name__)

@app.route("/user/signup", methods = ['POST','GET'])
def sigupuser():
    
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    try:
        data = request.form
        name=data.get('name')
        password=data.get('password')
        email=data.get('email')
        connection.execute("INSERT INTO user (name,password,email) VALUES (?,?,?);",(name,password,email))
        connection.commit()
        connection.close()
        return jsonify({"message":"------","status":200})
    except Exception as e:
        print (e)
        return "error"


@app.route("/user/signin", methods = ['POST'])
def sigupin():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    try:
        data = request.form
        password=data.get('password')
        email=data.get('email')
        rows = connection.execute("SELECT * FROM user WHERE email= (?) AND password= (?);",(email,password)).fetchone()
        
        connection.commit()
        connection.close()
        if(len(rows)>0):
            return jsonify({"message":"------","status":200})
        else:
            return "No such user"
    except Exception as e:
        print (e)
        return "error"

@app.route("/user/logout", methods = ['POST'])
def logout():
    return "LoggedOut"

@app.route("/seats/available", methods = ['GET'])
def getSeats():
    return jsonify({
         "seats": [
         {
         "seat": "A1",
         "price": 100
         },
         {
         "seat": "A2",
         "price": 100
         }
         ],
         "seatsAvailable": 100,
        })

@app.route("/seats/book", methods = ['GET'])
def bookSeat():
    return jsonify({
     "bookingStatus": "BOOKED",
     "bookingType": "ONLINE",
     "bookingDate": "2019-01-01",
     "bookingTime": "10:00",
     " bookedSeatsCount ": 2,
     "customer": {
         "name": "John Doe",
         "email": "johndoe@email.com"
         },
     "seats": ["A1","A2"],
     "bookingId":12345,
     "price":400
    })
    
@app.route("/seats/cancel", methods = ['GET'])
def cancelSeat():
    return jsonify({
         "success": True,
         "message": "Booking cancelled successfully"
        })

@app.route("/seats/booking/1234", methods = ['GET'])
def bookedDetails():
    return jsonify({
     "bookingStatus": "BOOKED",
     "bookingType": "ONLINE",
     "bookingDate": "2019-01-01",
     "bookingTime": "10:00",
     " bookedSeatsCount ": 2,
     "customer": {
         "name": "John Doe",
         "email": "johndoe@email.com"
         },
     "seats": ["A1","A2"],
     "bookingId":12345,
     "price":400
    })

@app.route("/seats/booked", methods = ['GET'])
def booked():
    return jsonify({
         "seats": [
         {
         "seat": "A1",
         "price": 100
         },
         {
         "seat": "A2",
         "price": 100
         }
         ],
         "seatsBooked": 2
        })



if __name__ == "__main__":
    app.run()

# connection.commit()
# connection.close()