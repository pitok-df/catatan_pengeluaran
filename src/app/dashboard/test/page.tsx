'use client'; // Jika elo menggunakan App Router

import { useState } from 'react';

export default function SaldoApp() {
    // State untuk saldo dan input
    const [saldo, setSaldo] = useState(100000); // Saldo awal
    const [pengeluaran, setPengeluaran] = useState(0); // Input pengeluaran

    // Fungsi untuk menangani perubahan input
    const handlePengeluaranChange = (e) => {
        const value = parseInt(e.target.value) || 0; // Pastikan input berupa angka
        setPengeluaran(value); // Update pengeluaran
        setSaldo(100000 - value); // Update saldo real-time
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Saldo Tracker</h1>
            <p>Saldo Awal: <strong>100,000</strong></p>
            <p>Saldo Saat Ini: <strong>{saldo}</strong></p>
            <div>
                <label htmlFor="pengeluaran">Masukkan Pengeluaran: </label>
                <input
                    id="pengeluaran"
                    type="number"
                    value={pengeluaran}
                    onChange={handlePengeluaranChange}
                    placeholder="0"
                    style={{ padding: '5px', marginLeft: '10px' }}
                />
            </div>
        </div>
    );
}
