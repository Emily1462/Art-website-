import urllib.request

urls = ["http://127.0.0.1:8000/index.html", "http://127.0.0.1:8000/admin.html"]
for url in urls:
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            html = resp.read().decode("utf-8")
            print(url)
            print("  status:", resp.status)
            print("  contains gallery:", "Gallery" in html)
            print("  contains admin:", "Admin" in html)
    except Exception as error:
        print(url)
        print("  ERROR:", error)
