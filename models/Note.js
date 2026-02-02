let notesStore = [];

class Note {
    constructor(title, content, id = null) {
        this.id = id || this.generateId();
        this.title = this.sanitizeText(title);
        this.content = this.sanitizeText(content);
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }


    sanitizeText(text) {
        return text ? text.trim() : '';
    }

   
    validate() {
        const errors = [];

        if (!this.title || this.title.length === 0) {
            errors.push('Title is required and cannot be empty');
        }

        if (!this.content || this.content.length === 0) {
            errors.push('Content is required and cannot be empty');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

class NoteRepository {

    static create(title, content) {
        const note = new Note(title, content);
        const validation = note.validate();

        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        notesStore.push(note);
        return note.toJSON();
    }

    static getAll() {
        return notesStore
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map(note => note.toJSON());
    }

 
    static findById(id) {
        return notesStore.find(note => note.id === id);
    }

    static update(id, updates) {
        const noteIndex = notesStore.findIndex(note => note.id === id);

        if (noteIndex === -1) {
            return null;
        }

        const note = notesStore[noteIndex];
        let hasChanges = false;


        if (updates.title !== undefined) {
            const sanitizedTitle = updates.title.trim();
            if (sanitizedTitle !== note.title) {
                if (sanitizedTitle.length === 0) {
                    throw new Error('Title cannot be empty');
                }
                note.title = sanitizedTitle;
                hasChanges = true;
            }
        }

       
        if (updates.content !== undefined) {
            const sanitizedContent = updates.content.trim();
            if (sanitizedContent !== note.content) {
                if (sanitizedContent.length === 0) {
                    throw new Error('Content cannot be empty');
                }
                note.content = sanitizedContent;
                hasChanges = true;
            }
        }

    
        if (hasChanges) {
            note.updated_at = new Date().toISOString();
        }

        return {
            note: note.toJSON(),
            wasUpdated: hasChanges
        };
    }

    
    static search(query) {
        const sanitizedQuery = query.trim().toLowerCase();

        if (sanitizedQuery.length === 0) {
            throw new Error('Search query cannot be empty');
        }

        const results = notesStore.filter(note => {
            const titleMatch = note.title.toLowerCase().includes(sanitizedQuery);
            const contentMatch = note.content.toLowerCase().includes(sanitizedQuery);
            return titleMatch || contentMatch;
        });

        return results
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map(note => note.toJSON());
    }

  
    static deleteAll() {
        notesStore = [];
    }

  
    static count() {
        return notesStore.length;
    }
}

module.exports = {
    Note,
    NoteRepository
};