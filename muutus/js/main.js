// Dados de exemplo dos professores
const teachersData = [
    {
        id: 1,
        name: "Carlos Mendes",
        specialty: "Violão e Guitarra",
        category: "arte",
        rating: 4.9,
        reviews: 127,
        price: 80,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        bio: "Professor de música com 15 anos de experiência",
        available: true
    },
    {
        id: 2,
        name: "Vanessa Silva",
        specialty: "Fotografia Digital",
        category: "hobbies",
        rating: 5.0,
        reviews: 89,
        price: 120,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        bio: "Fotógrafa profissional especializada em retratos",
        available: true
    },
    {
        id: 3,
        name: "Roberto Costa",
        specialty: "Programação Python",
        category: "tecnologia",
        rating: 4.8,
        reviews: 156,
        price: 150,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        bio: "Desenvolvedor sênior com experiência em ensino",
        available: true
    },
    {
        id: 4,
        name: "Juliana Martins",
        specialty: "Yoga e Meditação",
        category: "saude",
        rating: 4.9,
        reviews: 203,
        price: 90,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        bio: "Instrutora certificada de yoga com 10 anos de prática",
        available: true
    },
    {
        id: 5,
        name: "Pedro Oliveira",
        specialty: "Matemática e Física",
        category: "ciencias",
        rating: 4.7,
        reviews: 98,
        price: 100,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        bio: "Professor universitário com mestrado em física",
        available: true
    },
    {
        id: 6,
        name: "Mariana Santos",
        specialty: "Inglês Conversação",
        category: "idiomas",
        rating: 5.0,
        reviews: 174,
        price: 110,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        bio: "Professora nativa com certificação internacional",
        available: true
    }
];

// Renderizar professores em destaque na página inicial
function renderFeaturedTeachers() {
    const container = document.getElementById('featuredTeachers');
    if (!container) return;

    const featured = teachersData.slice(0, 3);
    
    container.innerHTML = featured.map(teacher => `
        <div class="teacher-card" onclick="viewTeacherProfile(${teacher.id})">
            <img src="${teacher.image}" alt="${teacher.name}" class="teacher-image">
            <div class="teacher-info">
                <h4 class="teacher-name">${teacher.name}</h4>
                <p class="teacher-specialty">${teacher.specialty}</p>
                <div class="teacher-rating">
                    <span class="stars">${'★'.repeat(Math.floor(teacher.rating))}${'☆'.repeat(5 - Math.floor(teacher.rating))}</span>
                    <span class="rating-count">${teacher.rating} (${teacher.reviews} avaliações)</span>
                </div>
                <div class="teacher-price">
                    R$ ${teacher.price}<span>/hora</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Buscar professores
function searchTeachers() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value : '';
    
    if (query.trim()) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'professores.html';
    }
}

// Filtrar por categoria
function filterByCategory(category) {
    localStorage.setItem('filterCategory', category);
    window.location.href = 'professores.html';
}

// Ver perfil do professor
function viewTeacherProfile(teacherId) {
    localStorage.setItem('selectedTeacherId', teacherId);
    window.location.href = 'professor-perfil.html';
}

// Adicionar aos favoritos
function toggleFavorite(teacherId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(teacherId)) {
        favorites = favorites.filter(id => id !== teacherId);
        showNotification('Removido dos favoritos');
    } else {
        favorites.push(teacherId);
        showNotification('Adicionado aos favoritos');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Atualizar UI se necessário
    const btn = document.querySelector(`[data-teacher-id="${teacherId}"]`);
    if (btn) {
        btn.textContent = favorites.includes(teacherId) ? '❤️ Favoritado' : '🤍 Favoritar';
    }
}

// Verificar se está nos favoritos
function isFavorite(teacherId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(teacherId);
}

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validação de formulários
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Formatar preço
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Sistema de avaliação com estrelas
function createStarRating(containerId, currentRating = 0, interactive = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let rating = currentRating;
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = i <= rating ? '★' : '☆';
        star.style.cssText = `
            font-size: 2rem;
            color: #fbbf24;
            cursor: ${interactive ? 'pointer' : 'default'};
            transition: transform 0.2s;
        `;
        
        if (interactive) {
            star.addEventListener('click', () => {
                rating = i;
                updateStars();
            });
            
            star.addEventListener('mouseenter', () => {
                star.style.transform = 'scale(1.2)';
            });
            
            star.addEventListener('mouseleave', () => {
                star.style.transform = 'scale(1)';
            });
        }
        
        container.appendChild(star);
    }
    
    function updateStars() {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
        });
    }
    
    return {
        getRating: () => rating,
        setRating: (newRating) => {
            rating = newRating;
            updateStars();
        }
    };
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar professores em destaque se estivermos na página inicial
    renderFeaturedTeachers();
    
    // Adicionar listener para busca com Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchTeachers();
            }
        });
    }
});

// Exportar dados para outras páginas
if (typeof window !== 'undefined') {
    window.teachersData = teachersData;
    window.searchTeachers = searchTeachers;
    window.filterByCategory = filterByCategory;
    window.viewTeacherProfile = viewTeacherProfile;
    window.toggleFavorite = toggleFavorite;
    window.isFavorite = isFavorite;
    window.showNotification = showNotification;
    window.validateForm = validateForm;
    window.validateEmail = validateEmail;
    window.formatPrice = formatPrice;
    window.createStarRating = createStarRating;
}
