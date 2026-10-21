import { Injectable, Inject } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { DbService } from "../db/db.service";
import { Book } from "./entities/book.entity";

@Injectable()
export class BookService {
  @Inject()
  private dbService: DbService;

  async list(keyword: string) {
    const books: Book[] = await this.dbService.read();
    if (!keyword) return books;
    return books.filter(
      (book) =>
        book.title.includes(keyword) ||
        book.author.includes(keyword) ||
        book.description.includes(keyword),
    );
  }

  async findOne(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const newBook: Book = {
      id: Math.floor(Math.random() * 1000000),
      title: createBookDto.title,
      author: createBookDto.author,
      description: createBookDto.description,
      cover: createBookDto.cover,
    };
    books.push(newBook);
    await this.dbService.write(books);
    return newBook;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((book) => book.id === updateBookDto.id);

    if (book) {
      book.title = updateBookDto.title;
      book.author = updateBookDto.author;
      book.description = updateBookDto.description;
      book.cover = updateBookDto.cover;
      await this.dbService.write(books);
      return book;
    }
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((book) => book.id === id);

    if (book) {
      books.splice(books.indexOf(book), 1);
      await this.dbService.write(books);
      return book;
    }
  }
}
