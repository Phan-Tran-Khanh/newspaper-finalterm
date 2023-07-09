// import { User } from 'src/entity/user.entity';
// import { faker } from '@faker-js/faker/locale/vi';
// import { Article } from 'src/entity/article.entity';
// import { Category } from 'src/entity/category.entity';
// import { Label } from 'src/entity/label.entity';
// import { Gender } from 'src/enum/Gender.enum';
// import { ArticleStatus } from 'src/enum/ArticleStatus.enum';
// import { CategoryService } from 'src/modules/category/category.service';
// import { LabelService } from 'src/modules/label/label.service';
// import { UserService } from 'src/modules/user/user.service';
// import { ArticleService } from 'src/modules/article/article.service.impl';

// export default async function fake(
//   categoryService: CategoryService,
//   labelService: LabelService,
//   userService: UserService,
//   articleService: ArticleService,
// ) {
//   const articles = await articleService.findAll();
//   articles.forEach((article) => {
//     article.title = fakeParagraph({ min: 1, max: 3 });
//     article.summary = fakeParagraph({ min: 5, max: 10 });
//     article.content = fakeParagraph({ min: 50, max: 100 });
//     articleService.update(article.id, article);
//   });
//   // async faker() {
//   // fakeCategorys().forEach((category) => {
//   //   this.categoryService.create(category);
//   // });
//   // fakeLabels().forEach((label) => {
//   //   this.labelService.create(label);
//   // });
//   // const categories = await this.categoryService.findAll();
//   // const labels = await this.labelService.findAll();
//   // const users = await this.userService.findAll();
//   // for (let i = 0; i < 10; i++) {
//   //   const user = fakeUser();
//   //   user.category = categories[Math.floor(Math.random() * categories.length)];
//   //   await this.userService.create(user);
//   // }
//   //   for (let i = 0; i < 100; i++) {
//   //     const article = fakeArticle(categories, labels, users);
//   //     await this.articleService.create(article);
//   //   }
//   // }
// }
// export function fakeUser(): User {
//   const user = new User();
//   user.firstName = faker.name.firstName();
//   user.lastName = faker.name.lastName();
//   user.email = faker.internet.email();
//   user.password = faker.internet.password();
//   user.dateOfBirth = faker.date.birthdate();
//   user.subcriptionExpiryDate = faker.date.future();
//   user.avatarUrl = fakeImageUrl();
//   user.gender = faker.helpers.arrayElement([
//     Gender.Female,
//     Gender.Male,
//     Gender.Other,
//   ]);
//   // user.penName = faker.name.firstName();
//   return user;
// }

// export function fakeArticle(
//   category: Category,
//   labels: Label[],
//   users: User[],
// ): Article {
//   const article = new Article();
//   article.title = faker.lorem.sentence();
//   article.summary = faker.lorem.paragraph(10);
//   article.content = faker.lorem.paragraphs(50);
//   article.bannerImageUrl = fakeImageUrl();
//   article.isPremium = faker.datatype.boolean();
//   article.viewCount = faker.datatype.number();
//   article.weeklyViewCount = faker.datatype.number();
//   article.status = ArticleStatus.Published;
//   article.publishedAt = faker.date.past();
//   // article.publishedBy = faker.helpers.arrayElement(users).id;
//   article.createdAt = faker.date.past();
//   article.createdBy = faker.helpers.arrayElement(users).id;
//   article.category = category;
//   article.labels = faker.helpers.arrayElements(labels, 3);
//   return article;
// }

// export function fakeImageUrl(): string {
//   return faker.image.imageUrl(undefined, undefined, undefined, true);
// }

// export function fakeCategorys(): Category[] {
//   const categories = [
//     {
//       name: 'News',
//       subcategories: ['Local News', 'International News', 'Politics'],
//     },
//     {
//       name: 'Business',
//       subcategories: [
//         'Economy',
//         'Stock Market',
//         'Companies',
//         'Entrepreneurship',
//       ],
//     },
//     {
//       name: 'Sports',
//       subcategories: ['Football', 'Basketball', 'Cricket', 'Tennis'],
//     },
//     {
//       name: 'Entertainment',
//       subcategories: ['Movies', 'Music', 'Celebrities', 'TV Shows'],
//     },
//     {
//       name: 'Technology',
//       subcategories: [
//         'Gadgets',
//         'Artificial Intelligence',
//         'Internet',
//         'Software',
//       ],
//     },
//     {
//       name: 'Lifestyle',
//       subcategories: ['Fashion', 'Health & Wellness', 'Food & Drink', 'Travel'],
//     },
//     {
//       name: 'Science',
//       subcategories: ['Physics', 'Biology', 'Chemistry', 'Astronomy'],
//     },
//     {
//       name: 'Opinion',
//       subcategories: ['Editorials', 'Commentary', 'Op-Ed'],
//     },
//   ];
//   return categories.map((category) => {
//     const newCategory = new Category();
//     const subcategories = category.subcategories.map((subcategory) => {
//       const newSubcategory = new Category();
//       newSubcategory.name = subcategory;
//       newSubcategory.description = subcategory;
//       newSubcategory.parent = newCategory;
//       return newSubcategory;
//     });
//     newCategory.name = category.name;
//     newCategory.description = category.name;
//     newCategory.children = subcategories;
//     return newCategory;
//   });
// }

// export function fakeLabels(): Label[] {
//   const labels = [
//     'Breaking News',
//     'Top Stories',
//     'Local News',
//     'International News',
//     'Politics',
//     'Business',
//     'Sports',
//     'Entertainment',
//     'Technology',
//     'Science',
//     'Health',
//     'Lifestyle',
//     'Opinion',
//     'Editorial',
//     'Features',
//     'Arts and Culture',
//     'Travel',
//     'Education',
//     'Weather',
//     'Finance',
//   ];
//   return labels.map((label) => {
//     const newLabel = new Label();
//     newLabel.name = label;
//     newLabel.description = label;
//     return newLabel;
//   });
// }

// function fakeSentence(): string {
//   const sentence = faker.word.words({ count: { min: 5, max: 10 } });
//   return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
// }

// function fakeParagraph(option: any): string {
//   let paragraph = '';
//   for (let i = 0; i < faker.number.int(option); i++) {
//     paragraph += fakeSentence() + ' ';
//   }
//   return paragraph.slice(0, -1);
// }
