import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { Comment } from "./comment";
import { User } from "./user";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        type: 'text'
    })
    content!: string;

    @Column({ nullable: true })
    userId!: number;
    

    @OneToMany(_type=> Comment, (comment: Comment) => comment.post)
    comments!: Array<Comment>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}