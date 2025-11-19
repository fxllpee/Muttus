// Variáveis globais
let currentPage = 1;
const itemsPerPage = 6;
let filteredTeachers = [];

// Renderizar lista de professores
function renderTeachersList(teachers, page = 1) {
    const container = document.getElementById('teachersList');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!container) return;

    // Calcular paginação
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTeachers = teachers.slice(startIndex, endIndex);

    // Atualizar contagem
    if (resultsCount) {
        resultsCount.textContent = `${teachers.length} professor${teachers.length !== 1 ? 'es' : ''} encontrado${teachers.length !== 1 ? 's' : ''}`;
    }

    // Renderizar professores
    if (paginatedTeachers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Nenhum professor encontrado</h3>
                <p>Tente ajustar os filtros para ver mais resultados</p>
                <button class="btn-primary" onclick="clearFilters()">Limpar Filtros</button>
            </div>
        `;
        return;
    }

    container.innerHTML = paginatedTeachers.map(teacher => {
        const isFav = isFavorite(teacher.id);
        return `
            <div class="teacher-item">
                <img src="${teacher.image}" alt="${teacher.name}" class="teacher-avatar">
                <div class="teacher-details">
                    <div class="teacher-header">
                        <div class="teacher-title">
                            <h3>${teacher.name}</h3>
                            <p>${teacher.specialty}</p>
                        </div>
                        <div class="teacher-price-tag">
                            <div class="price">R$ ${teacher.price}</div>
                            <div class="period">/hora</div>
                        </div>
                    </div>
                    <p class="teacher-bio">${teacher.bio}</p>
                    <div class="teacher-meta">
                        <div class="meta-item">
                            <span class="stars">${'★'.repeat(Math.floor(teacher.rating))}${'☆'.repeat(5 - Math.floor(teacher.rating))}</span>
                            <span>${teacher.rating}</span>
                        </div>
                        <div class="meta-item">
                            <span>${teacher.reviews} avaliações</span>
                        </div>
                        <div class="meta-item">
                            <span>${teacher.available ? '✓ Disponível' : '✗ Indisponível'}</span>
                        </div>
                    </div>
                    <div class="teacher-actions">
                        <button class="btn-view" onclick="viewTeacherProfile(${teacher.id})">Ver Perfil</button>
                        <button class="btn-favorite ${isFav ? 'active' : ''}" 
                                data-teacher-id="${teacher.id}"
                                onclick="toggleFavoriteAndUpdate(${teacher.id})">
                            ${isFav ? '❤️ Favoritado' : '🤍 Favoritar'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Renderizar paginação
    renderPagination(teachers.length, page);
}

// Renderizar paginação
function renderPagination(totalItems, currentPage) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Botão anterior
    paginationHTML += `
        <button class="page-btn" 
                onclick="goToPage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''}>
            ← Anterior
        </button>
    `;

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                        onclick="goToPage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="page-btn" disabled>...</span>`;
        }
    }

    // Botão próximo
    paginationHTML += `
        <button class="page-btn" 
                onclick="goToPage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''}>
            Próximo →
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Ir para página
function goToPage(page) {
    currentPage = page;
    renderTeachersList(filteredTeachers, currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Aplicar filtros
function applyFilters() {
    const searchTerm = document.getElementById('filterSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('filterCategory')?.value || '';
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;
    const minRating = parseFloat(document.getElementById('filterRating')?.value) || 0;
    const sortBy = document.getElementById('sortBy')?.value || 'rating';

    // Filtrar
    filteredTeachers = window.teachersData.filter(teacher => {
        const matchesSearch = !searchTerm || 
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.specialty.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || teacher.category === category;
        const matchesPrice = teacher.price >= minPrice && teacher.price <= maxPrice;
        const matchesRating = teacher.rating >= minRating;

        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Ordenar
    switch (sortBy) {
        case 'rating':
            filteredTeachers.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filteredTeachers.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredTeachers.sort((a, b) => b.price - a.price);
            break;
        case 'reviews':
            filteredTeachers.sort((a, b) => b.reviews - a.reviews);
            break;
    }

    currentPage = 1;
    renderTeachersList(filteredTeachers, currentPage);
}

// Limpar filtros
function clearFilters() {
    document.getElementById('filterSearch').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('filterRating').value = '';
    document.getElementById('sortBy').value = 'rating';
    
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('filterCategory');
    
    applyFilters();
}

// Toggle favorito e atualizar UI
function toggleFavoriteAndUpdate(teacherId) {
    toggleFavorite(teacherId);
    
    // Atualizar botão
    const btn = document.querySelector(`[data-teacher-id="${teacherId}"]`);
    if (btn) {
        const isFav = isFavorite(teacherId);
        btn.textContent = isFav ? '❤️ Favoritado' : '🤍 Favoritar';
        btn.classList.toggle('active', isFav);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carregar filtros salvos
    const savedSearch = localStorage.getItem('searchQuery');
    const savedCategory = localStorage.getItem('filterCategory');
    
    if (savedSearch) {
        const searchInput = document.getElementById('filterSearch');
        if (searchInput) searchInput.value = savedSearch;
        localStorage.removeItem('searchQuery');
    }
    
    if (savedCategory) {
        const categorySelect = document.getElementById('filterCategory');
        if (categorySelect) categorySelect.value = savedCategory;
        localStorage.removeItem('filterCategory');
    }

    // Aplicar filtros iniciais
    applyFilters();

    // Adicionar listeners para filtros em tempo real
    const filterInputs = [
        'filterSearch',
        'filterCategory',
        'minPrice',
        'maxPrice',
        'filterRating',
        'sortBy'
    ];

    filterInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', applyFilters);
            if (element.tagName === 'INPUT') {
                element.addEventListener('input', debounce(applyFilters, 500));
            }
        }
    });
});

// Função debounce para evitar muitas chamadas
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funções
if (typeof window !== 'undefined') {
    window.applyFilters = applyFilters;
    window.clearFilters = clearFilters;
    window.goToPage = goToPage;
    window.toggleFavoriteAndUpdate = toggleFavoriteAndUpdate;
}
