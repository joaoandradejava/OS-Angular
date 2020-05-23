export class Url {
    public static get baseUrl(): string { return 'http://localhost:8080/' }
    public static get baseCliente(): string { return this.baseUrl + 'cliente/' }
    public static get baseFornecedor(): string { return this.baseUrl + 'fornecedor/' }
    public static get baseFuncionario(): string { return this.baseUrl + 'funcionario/' }
    public static get baseProduto(): string { return this.baseUrl + 'produto/' }
    public static get baseTelefone(): string { return this.baseUrl + 'telefone/' }
    public static get baseUsuario(): string { return this.baseUrl + 'usuario/' }
    public static get baseOrdemDeServico(): string { return this.baseUrl + 'ordemDeServico/' }
    public static get baseLogin(): string { return this.baseUrl + 'login/' }
}