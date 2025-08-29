# Flask backend for AI Stand-up Comedian
# Run: pip install -r requirements.txt && python server_flask.py

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.post('/api/generate-script')
def generate_script():
    data = request.get_json(silent=True) or {}
    topic = data.get('topic', 'life')
    style = data.get('style', 'friendly')
    length = data.get('length', 'short')
    return jsonify({
        'script': f'Placeholder: stand-up script about {topic} in {style} style ({length}).'
    })

@app.post('/api/tts')
def tts():
    data = request.get_json(silent=True) or {}
    text = data.get('text', '')
    return jsonify({'audioUrl': None, 'note': 'Integrate TTS provider here.'})

@app.post('/api/video')
def video():
    data = request.get_json(silent=True) or {}
    return jsonify({'videoUrl': None, 'note': 'Integrate avatar/video provider here.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5055, debug=True)
