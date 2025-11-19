// Simular autenticação (em produção, isso seria feito no backend)

// Fazer login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked;
    
    // Validação básica
    if (!email || !password) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    // Simular autenticação
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Salvar sessão
        const session = {
            userId: user.id,
            email: user.email,
            name: user.name,
            userType: user.userType,
            loggedAt: new Date().toISOString()
        };
        
        if (remember) {
            localStorage.setItem('session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('session', JSON.stringify(session));
        }
        
        // Redirecionar baseado no tipo de usuário
        if (user.userType === 'teacher' || user.userType === 'both') {
            window.location.href = 'professor-dashboard.html';
        } else {
            window.location.href = 'aluno-dashboard.html';
        }
    } else {
        alert('E-mail ou senha incorretos');
    }
}

// Fazer cadastro
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    const terms = document.getElementById('terms').checked;
    const age = document.getElementById('age').checked;
    
    // Validações
    if (!name || !email || !password || !confirmPassword || !userType) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
    }
    
    if (password.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres');
        return;
    }
    
    if (!terms) {
        alert('Você deve concordar com os Termos de Uso');
        return;
    }
    
    if (!age) {
        alert('Você deve ter 18 anos ou mais para se cadastrar');
        return;
    }
    
    // Verificar se o e-mail já existe
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('Este e-mail já está cadastrado');
        return;
    }
    
    // Criar novo usuário
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // Em produção, NUNCA armazenar senha em texto puro!
        userType,
        createdAt: new Date().toISOString(),
        verified: false
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Fazer login automaticamente
    const session = {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        userType: newUser.userType,
        loggedAt: new Date().toISOString()
    };
    
    localStorage.setItem('session', JSON.stringify(session));
    
    // Redirecionar baseado no tipo de usuário
    if (userType === 'teacher' || userType === 'both') {
        window.location.href = 'professor-dashboard.html';
    } else {
        window.location.href = 'aluno-dashboard.html';
    }
}

// Login com Google (simulado)
function loginWithGoogle() {
    alert('Login com Google será implementado em breve!');
}

// Login com Facebook (simulado)
function loginWithFacebook() {
    alert('Login com Facebook será implementado em breve!');
}

// Cadastro com Google (simulado)
function registerWithGoogle() {
    alert('Cadastro com Google será implementado em breve!');
}

// Cadastro com Facebook (simulado)
function registerWithFacebook() {
    alert('Cadastro com Facebook será implementado em breve!');
}

// Verificar se está logado
function isLoggedIn() {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    return session !== null;
}

// Obter usuário atual
function getCurrentUser() {
    const sessionData = localStorage.getItem('session') || sessionStorage.getItem('session');
    if (sessionData) {
        return JSON.parse(sessionData);
    }
    return null;
}

// Fazer logout
function logout() {
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');
    window.location.href = 'index.html';
}

// Proteger páginas que requerem autenticação
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Exportar funções
if (typeof window !== 'undefined') {
    window.handleLogin = handleLogin;
    window.handleRegister = handleRegister;
    window.loginWithGoogle = loginWithGoogle;
    window.loginWithFacebook = loginWithFacebook;
    window.registerWithGoogle = registerWithGoogle;
    window.registerWithFacebook = registerWithFacebook;
    window.isLoggedIn = isLoggedIn;
    window.getCurrentUser = getCurrentUser;
    window.logout = logout;
    window.requireAuth = requireAuth;
}
