from crypt import methods
from boggle import Boggle
from flask import Flask, request, render_template, session, flash, jsonify, redirect
from flask_debugtoolbar import DebugToolbarExtension
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = "hayduke"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def display_board():
    """ This takes us to the main page updates player with hi score and number when the game restarts"""
    board = boggle_game.make_board()
    session['game_board'] = board
    session['number_of_games']
    session['hi_score']
    return render_template('boggle_home.html', board=board, hi_score =session['hi_score'])


@app.route("/check-word")
def check_word():
    """Sends checks word sent from ajax returns result back"""
    word = request.args["word"]
    print (boggle_game.check_valid_word(session['game_board'], word))
    result = {"result": boggle_game.check_valid_word(session['game_board'], word)}
    result = jsonify(result)
    return result

@app.route('/score', methods=['POST'])
def keep_score():
    """Supposed to update hi_score and number of games, un-implimented """
    hi_score = session['hi_score']
    session['number_of_games'] = session['number_of_games'] + 1
    number_of_games = session['number_of_games']
    score = request.get_data('points')
    score = json.loads(score)
    score = score['points']
    print(score, hi_score)
    if score > hi_score:
        hi_score = score
        session['hi_score'] = hi_score
        new_high_score = {'hi_score': hi_score}
        return new_high_score
    else:
        new_high_score = {'hi_score': hi_score}
        return new_high_score



