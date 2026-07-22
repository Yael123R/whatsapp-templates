class Template {
  constructor(titulo, mensaje, hashtag) {
    this.id = crypto.randomUUID(); // ← Identificador único para cada plantilla
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.hashtag = hashtag;
    this.fecha = new Date(); // Guarda el momento exacto de creación
  }
}