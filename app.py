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
    board = boggle_game.make_board()
    session['game_board'] = board
    score = session.get("score", 0)


    return render_template('boggle_home.html', board=board, score=score)


@app.route("/check-word")
def check_word():
    word = request.args["word"]
    print (boggle_game.check_valid_word(session['game_board'], word))
    result = {'result': boggle_game.check_valid_word(session['game_board'], word)}
    return result

@app.route('/score', methods=["POST"])
def keep_score():
    score = score + 1
    return render_template('boggle_home.html', board = session['game_board'], score = score)




