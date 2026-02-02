// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Express is running! but database not connected!');
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });





const createApp = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const app = createApp();

const server = app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 NOTES API SERVER STARTED');
    console.log('='.repeat(60));
    console.log(`📡 Port:        ${PORT}`);
    console.log(`🌍 Environment: ${ENV}`);
    console.log(`⏰ Started at:  ${new Date().toISOString()}`);
    console.log('='.repeat(60));
    console.log('\n📝 Available Endpoints:');
    console.log(`   POST   http://localhost:${PORT}/notes`);
    console.log(`   GET    http://localhost:${PORT}/notes`);
    console.log(`   PUT    http://localhost:${PORT}/notes/:id`);
    console.log(`   GET    http://localhost:${PORT}/notes/search?q=query`);
    console.log('\n⚡ Features:');
    console.log('   • Rate Limiting: 5 note creations per minute');
    console.log('   • Smart Updates: Detects actual changes');
    console.log('   • Intelligent Search: Case-insensitive partial matching');
    console.log('   • Auto-Sanitization: Trims whitespace automatically');
    console.log('='.repeat(60) + '\n');
});

process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM signal received');
    console.log('📦 Closing HTTP server...');
    server.close(() => {
        console.log('✅ HTTP server closed');
        console.log('👋 Process terminated gracefully\n');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT signal received (Ctrl+C)');
    console.log('📦 Closing HTTP server...');
    server.close(() => {
        console.log('✅ HTTP server closed');
        console.log('👋 Process terminated gracefully\n');
        process.exit(0);
    });
});

process.on('uncaughtException', (error) => {
    console.error('💥 UNCAUGHT EXCEPTION:');
    console.error(error);
    console.log('🛑 Shutting down...\n');
    process.exit(1);
});


process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 UNHANDLED REJECTION at:', promise);
    console.error('Reason:', reason);
    console.log('🛑 Shutting down...\n');
    process.exit(1);
});
