from pathlib import Path

from flask import Flask, render_template


FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

app = Flask(__name__, template_folder=str(FRONTEND_DIR))


@app.route("/products")
def products():
    return render_template("products.html")


@app.route("/add_product")
def add_product():
    return render_template("add_product.html")


@app.route("/customers")
def customers():
    return render_template("customers.html")


@app.route("/add_customer")
def add_customer():
    return render_template("add_customer.html")


@app.route("/brands")
def brands():
    return render_template("brands.html")


@app.route("/flavors")
def flavors():
    return render_template("flavors.html")


@app.route("/product_types")
def product_types():
    return render_template("product_types.html")


@app.route("/suppliers")
def suppliers():
    return render_template("suppliers.html")


@app.route("/supplier_products")
def supplier_products():
    return render_template("supplier_products.html")


@app.route("/invoices")
def invoices():
    return render_template("invoices.html")


@app.route("/invoice_details")
def invoice_details():
    return render_template("invoice_details.html")
