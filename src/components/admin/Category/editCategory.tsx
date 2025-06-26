import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategory } from '../../interface/category';

type Props = {};

const EditCategory = (props: Props) => {
    const { register, handleSubmit, reset } = useForm<ICategory>({
        defaultValues: {
            id: '',
            name: '',
        },  
    });

    // Lấy id danh mục
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return; // Kiểm tra id có tồn tại không

        const getCategoryById = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/categories/${id}`);
                reset(data); // Cập nhật form với dữ liệu từ API
                
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu danh mục:', error);
            }
        };

        getCategoryById();
    }, [id, reset]); // Thêm id và reset vào dependency array

    const onSubmit = async (category: ICategory) => {
        try {
            await axios.put(`http://localhost:3000/categories/${id}`, category);
            alert('Cập nhật thành công');
            navigate('/dashboard/category-list');
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
        }
    };

    return (
        <div className='max-w-2xl mx-auto py-10'>
            <h1 className='font-bold text-[24px] text-center'>Cập nhật danh mục</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'
            >
                <input
                    {...register('name', { required: true })}
                    type='text'
                    placeholder='Tên danh mục'
                />
                <div className='flex justify-end'>
                    <button className='bg-green-900 text-white py-1 px-4 rounded'>
                        Cập nhật danh mục
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;
