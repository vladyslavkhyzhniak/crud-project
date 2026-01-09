Projekt wykonany jako rozwiązanie zadania rekrutacyjnego. Aplikacja typu służąca do zarządzania kampaniami reklamowymi z symulacją budżetu w czasie rzeczywistym.

[**🔗 ZOBACZ DEMO LIVE (Netlify)**](https://crud-project1.netlify.app/)

Aby uruchomić projekt u siebie:

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/vladyslavkhyzhniak/crud-project.git](https://github.com/vladyslavkhyzhniak/crud-project.git)
    cd crud-project
    ```

2.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```

3.  **Konfiguracja środowiska:**
    Utwórz plik `.env` w głównym katalogu i dodaj klucze Firebase:
    ```env
    VITE_FIREBASE_API_KEY=
    VITE_FIREBASE_AUTH_DOMAIN=
    VITE_FIREBASE_PROJECT_ID=
    VITE_FIREBASE_STORAGE_BUCKET=
    VITE_FIREBASE_MESSAGING_SENDER_ID=
    VITE_FIREBASE_APP_ID=
    VITE_FIREBASE_MEASUREMENT_ID=
    ```

4.  **Uruchom aplikację:**
    ```bash
    npm run dev
    ```
