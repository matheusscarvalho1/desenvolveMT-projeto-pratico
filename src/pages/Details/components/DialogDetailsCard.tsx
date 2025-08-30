import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../../../components/ui/shadcn-io/dropzone/index";
import { Textarea } from "../../../components/ui/textarea";
import { api } from "../../../lib/api";
import { cn } from "../../../lib/utils";
interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ocoId: number;
}

const DialogDetailsCard = ({
  isOpen,
  onOpenChange,
  ocoId,
}: LoginDialogProps) => {
  const formSchema = z.object({
    informacao: z.string().min(5, {
      message: "Mensagem deve ter pelo menos 5 caracteres.",
    }),
    data: z.date({
      message: "Por favor, selecione uma data",
    }),
    anexos: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      informacao: "",
      data: undefined,
      anexos: undefined,
    },
  });
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("ocoId", ocoId.toString());
      formData.append("informacao", values.informacao);

      const formattedDate = values.data.toISOString().split("T")[0];
      formData.append("data", formattedDate);

      if (values.anexos) {
        values.anexos.forEach((file: File) => {
          formData.append("anexos", file);
        });
      }

      const response = await api.post(
        "/ocorrencias/informacoes-desaparecido",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Sucesso:", response.data);
    } catch (error: any) {
      console.error("Erro ao enviar:", error.response?.data || error.message);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Button className="cursor-pointer" variant="default" size="lg" asChild>
        <DialogTrigger>Adicionar mais informações</DialogTrigger>
      </Button>
      <DialogContent className="xl:min-w-3xl">
        <DialogHeader className="text-left">
          <DialogTitle>Adicionar Informações</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar informações adicionais.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do ocorrido</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="informacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informações relevantes do ocorrido</FormLabel>
                  <FormControl>
                    <Textarea
                      className="pl-4 text-sm"
                      placeholder="Descreva detalhadamente as circunstâncias do desaparecimento, características físicas, vestimentas e qualquer informação que possa ajudar na localização."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dropzone
              accept={{
                "image/*": [],
                "application/pdf": [],
                "application/msword": [],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  [],
              }}
              maxFiles={10}
              maxSize={1024 * 1024 * 10}
              minSize={1024}
              onDrop={handleDrop}
              onError={console.error}
              src={files}
            >
              <DropzoneEmptyState />
              <DropzoneContent />
            </Dropzone>
            <DialogFooter className="justify-">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailsCard;
