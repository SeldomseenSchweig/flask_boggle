from crypt import methods
from boggle import Boggle
from flask import Flask, request, render_template, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "hayduke"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def display_board():
    board = boggle_game.make_board()
    session['game_board'] = board

    return render_template('boggle_home.html', board=board)


