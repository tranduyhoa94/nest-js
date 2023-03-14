import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
    private events: Event[] = [];

    @Get()
    findAll() {
        return this.events;
    }
    
    @Get(':id')
    findOne(@Param('id') id) {
        const event = this.events.find((event) => {
            event.id === parseInt(id);
        });

        if (!event) {
            return [];
        }

        return event;
    }
    
    @Post()
    create(@Body() input: CreateEventDto) {
        const event = {
            ...input,
            id: this.events.length + 1
        };

        this.events.push(event);
        return event;
    }
    
    @Post(':id')
    update(@Param('id') id, @Body() input: UpdateEventDto) {
        const index = this.events.findIndex(event => {
            event.id === parseInt(id);
        })

        this.events[index] = {
            ...this.events[index],
            ...input
        }

        return this.events[index]; 
    }
    
    @Delete(':id')
    remove(@Param('id') id) {
        // this.events = this.events.filter(event => {
            
        // })
    }
}