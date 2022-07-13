from crypt import methods
from boggle import Boggle
from flask import Flask, request, render_template, session, flash, jsonify, redirect
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "hayduke"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def display_board():
    """ This takes us to the main page updates player with hi score and number"""
    board = boggle_game.make_board()
    session['game_board'] = board
    session['number_of_games'] = 0
    session['hi_score'] = 0
    return render_template('boggle_home.html', board=board, score=session['hi_score'])


@app.route("/check-word")
def check_word():
    word = request.args["word"]
    print (boggle_game.check_valid_word(session['game_board'], word))
    result = {"result": boggle_game.check_valid_word(session['game_board'], word)}
    result = jsonify(result)
    return result

@app.route('/score', methods=["POST"])
def keep_score():
    hi_score = 0
    score = request.args['score']
    if score > hi_score:
        hi_score = score
        session['hi_score'] = hi_score
        return hi_score
    else:
        session['hi_score'] = hi_score
        return hi_score




