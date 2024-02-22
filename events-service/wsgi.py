from api import init_app


app = init_app()
print(app.url_map)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
