from flask import Flask, request, send_file, jsonify
from fpdf import FPDF
import io

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_to_pdf():
    data = request.get_json()

    if not data or 'content' not in data:
        return jsonify({'error': 'Missing content field'}), 400

    content = data['content']

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, content)

    pdf_bytes = pdf.output(dest='S').encode('latin1')
    pdf_output = io.BytesIO(pdf_bytes)

    return send_file(
        pdf_output,
        mimetype='application/pdf',
        as_attachment=True,
        download_name='converted.pdf'
    )

if __name__ == '__main__':
    app.run(debug=True, port=6000)
