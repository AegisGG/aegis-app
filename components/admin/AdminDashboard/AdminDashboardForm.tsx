import { TeamData, GameData, DropdownData } from 'types';
import { useState, useEffect } from 'react';
import { ref } from 'firebase/database';
import { database } from '@helpers/firebaseConfig';
import { useDatabaseSetMutation } from '@react-query-firebase/database';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Button } from '@components/ui';

interface EventFormData {
  [key: string]: string | TeamData;
}

interface AdminDashboardFormProps {
  data: GameData | undefined;
  selectedGame: string;
}

interface FormStatusData {
  title: string;
  message: string;
}

export default function AdminDashboardForm({ data, selectedGame }: AdminDashboardFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatusData | null>(null);
  const dbRef = ref(database, `games/${selectedGame}`);
  const mutation = useDatabaseSetMutation(dbRef);
  const { register, handleSubmit, setValue } = useForm<EventFormData>();

  const onSubmit: SubmitHandler<EventFormData> = data => {
    const newData = {
      event: data.eventName,
      image: data.eventLogo,
      type: data.eventType,
      time: data.eventTime,
      ['team-1']: {
        name: data.team1Name,
        image: data.team1Image,
        result: data.team1Result
      },
      ['team-2']: {
        name: data.team2Name,
        image: data.team2Image,
        result: data.team2Result
      }
    };

    mutation.mutate(newData, {
      onSuccess() {
        setIsModalOpen(true);
        setFormStatus({ title: 'Success!', message: "You've successfully updated the database." });
      },
      onError(error) {
        setIsModalOpen(true);
        setFormStatus({ title: 'Success!', message: error.message });
      }
    });
  };

  useEffect(() => {
    if (data) {
      setValue('eventName', data?.event ?? '');
      setValue('eventType', data?.type ?? '');
      setValue('eventTime', data?.time ?? '');
      setValue('eventLogo', data?.image ?? '');
      setValue('team1Name', data['team-1'].name ?? '');
      setValue('team1Image', data['team-1'].image ?? '');
      setValue('team1Result', data['team-1'].result ?? '');
      setValue('team2Name', data['team-2'].name ?? '');
      setValue('team2Image', data['team-2'].image ?? '');
      setValue('team2Result', data['team-2'].result ?? '');
    }
  }, [data]);

  useEffect(() => {
    if (isModalOpen) {
      const modalTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
      return () => clearTimeout(modalTimer);
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal
        open={isModalOpen}
        title={formStatus?.title}
        message={formStatus?.message}
        onClose={() => setIsModalOpen(false)}
      />

      <form className="flex flex-col gap-12 desktop:grid desktop:grid-cols-8" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-6 desktop:col-span-8">
          <div>
            <label className="mb-2 block" htmlFor="eventName">
              Event Name
            </label>
            <input
              id="eventName"
              className="h-8"
              type="text"
              aria-label="event name input"
              aria-required="true"
              required
              {...register('eventName')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="eventTime">
              Event Time
            </label>
            <input
              id="eventTime"
              className="h-8"
              type="text"
              aria-label="event time input"
              {...register('eventTime')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="eventType">
              Event Type
            </label>
            <input
              id="eventType"
              className="h-8"
              type="text"
              aria-label="event type input"
              {...register('eventType')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="eventLogo">
              Event Logo
            </label>
            <input
              id="eventLogo"
              className="h-8"
              type="text"
              aria-label="event logo input"
              {...register('eventLogo')}
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-6 desktop:col-span-4">
          <legend className="mb-4 font-serif text-2xl">Team 1</legend>
          <div>
            <label className="mb-2 block" htmlFor="team1Name">
              Name
            </label>
            <input
              id="team1Name"
              className="h-8"
              type="text"
              aria-label="team 1 name input"
              aria-required="true"
              required
              {...register('team1Name')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="team1Image">
              Logo
            </label>
            <input
              id="team1Image"
              className="h-8"
              type="text"
              aria-label="team 1 name input"
              {...register('team1Image')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="team1Result">
              Result
            </label>
            <input
              id="team1Result"
              className="h-8"
              type="text"
              aria-label="team 1 name input"
              aria-required="true"
              required
              {...register('team1Result')}
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-6 desktop:col-span-4">
          <legend className="mb-4 font-serif text-2xl">Team 2</legend>
          <div>
            <label className="mb-2 block" htmlFor="team2Name">
              Name
            </label>
            <input
              id="team2Name"
              className="h-8"
              type="text"
              aria-label="team 2 name input"
              aria-required="true"
              required
              {...register('team2Name')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="team2Image">
              Logo
            </label>
            <input
              id="team2Image"
              className="h-8"
              type="text"
              aria-label="team 2 name input"
              {...register('team2Image')}
            />
          </div>

          <div>
            <label className="mb-2 block" htmlFor="team2Result">
              Result
            </label>
            <input
              id="team2Result"
              className="h-8"
              type="text"
              aria-label="team 2 name input"
              aria-required="true"
              required
              {...register('team2Result')}
            />
          </div>
        </fieldset>

        <Button className="ml-4 w-[calc(100%_-_20px)] desktop:col-span-8">Submit</Button>
      </form>
    </>
  );
}
