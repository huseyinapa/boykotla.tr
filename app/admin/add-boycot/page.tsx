"use client";
import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { Editor } from "primereact/editor";


export default function AddBoycot() {
  // Form state'leri
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reasons, setReasons] = useState(['']);
  const [alternatives, setAlternatives] = useState(['']);
  const [text, setText] = useState('')

  // Logo yükleme state'leri
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form gönderildiğinde
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Boş nedenleri ve alternatifleri kaldır
    const filteredReasons = reasons.filter(reason => reason.trim() !== '');

    // FormData oluştur
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('reasons', JSON.stringify(filteredReasons));

    if (selectedFile) {
      formData.append('logo', selectedFile);
    }

    // try {
    //   // API çağrısı (şimdilik bir console.log)
    //   console.log('Gönderilecek veriler:', {
    //     title,
    //     description,
    //     reasons: filteredReasons,
    //     alternatives: filteredAlternatives,
    //     logoFile: selectedFile?.name
    //   });

    //   const response = await fetch('http://localhost/api/boycot/add', {
    //       method: 'POST',
    //       body: formData,
    //   });

    //   if (response.ok) {
    //       const data = await response.json();
    //       alert('Boykot başarıyla eklendi!');
    //       // Form alanlarını temizle
    //       resetForm();
    //   } else {
    //       alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    //   }

    //   // Başarılı ekleme simülasyonu
    //   alert('Boykot başarıyla eklendi! (Demo)');
    //   resetForm();

    // } catch (error) {
    //   console.error('Hata:', error);
    //   alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    // }
  };

  // Formu sıfırla
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setReasons(['']);
    setAlternatives(['']);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Dosya seçildiğinde
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Önizleme URL'si oluştur
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Nedenler için input alanları ekle/kaldır
  const handleAddReason = () => {
    setReasons([...reasons, '']);
  };

  const handleRemoveReason = (index: number) => {
    const newReasons = [...reasons];
    newReasons.splice(index, 1);
    setReasons(newReasons);
  };

  const handleReasonChange = (index: number, value: string) => {
    const newReasons = [...reasons];
    newReasons[index] = value;
    setReasons(newReasons);
  };



  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
        <Icon icon="material-symbols:arrow-back" width={24} height={24} className="mr-2" />
        Tüm Boykotlar
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Yeni Boykot Ekle</h1>

        <form onSubmit={handleSubmit}>
          {/* Logo Yükleme Alanı */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3">Marka Logosu</label>
            <div className="flex items-center space-x-6">
              <div
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Logo önizleme"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="text-center">
                    <Icon icon="material-symbols:cloud-upload" width={40} height={40} className="mx-auto text-gray-400" />
                    <p className="text-sm text-gray-500 mt-1">Tıkla veya sürükle</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
          
            </div>
          </div>

          {/* Temel Bilgiler */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium mb-2">Marka Adı</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Örn: ABC Markası"
              required
            />
          </div>

          {/* Boykot Nedenleri */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Boykot Nedenleri</label>
            {reasons.map((reason, index) => (
              <div key={`reason-${index}`} className="flex items-center mb-2">
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => handleReasonChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Neden ${index + 1}`}
                />
                {reasons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveReason(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Icon icon="material-symbols:delete-outline" width={24} height={24} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddReason}
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
            >
              <Icon icon="material-symbols:add-circle-outline" width={20} height={20} className="mr-1" />
              Yeni Neden Ekle
            </button>
          </div>
          {/*Boykot Açıklama */}
          <div className='card'>
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
          </div>


          {/* Gönder Butonu */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 mr-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Formu Temizle
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Boykot Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}