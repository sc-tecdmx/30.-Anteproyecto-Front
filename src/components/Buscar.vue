<template>
    <ul class="navbar-item flex-row ms-md-0 ms-3">
        <li 
            class="nav-item align-self-center search-animated"
            >
            <form class="form-inline search-full search"
            > 
                <div class="search-bar">
                    <input 
                        type="text"
                        class="form-control search-form-control ms-lg-auto"
                        placeholder="Buscar..."
                    />
                </div>
            </form>
            <i class="fa-solid fa-magnifying-glass"></i>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'Buscar',
}
</script>

<style scoped>
</style>