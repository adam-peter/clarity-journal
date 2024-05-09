"use client";
import { askQuestion } from "@/utils/api";
import React, { FormEvent, useState, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(question);
    setResponse(answer);
    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        {/* <input
          type="text"
          disabled={loading}
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="rounded-lg rounded-r-none border border-r-0 border-b-black/20 px-4 py-2 text-lg"
        />
        <Button
          type="submit"
          disabled={loading}
          className="rounded-lg rounded-l-none border border-l-0 border-b-black/20 bg-blue-400 px-4 py-2 text-lg"
        >
          Ask
        </Button> */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Ask Question</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex h-[70vh] flex-col items-center gap-4 py-10">
              <DrawerHeader>
                <DrawerTitle className="text-2xl ">
                  Ask a question about your journal entries!
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex w-1/2 gap-2">
                <Input
                  type="text"
                  disabled={loading}
                  placeholder="Ask a question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSubmit(e);
                    }
                  }}
                  className=""
                />
                <Button type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>

              <div className="max-h-full w-1/2 overflow-y-auto p-2">
                {/* {response && <div>{response}</div>} */}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facilis nostrum id rem aspernatur molestiae cumque amet
                doloribus delectus consequuntur accusantium tempora, laboriosam
                impedit sit natus exercitationem atque? Nostrum facilis maiores
                laudantium autem magnam aut praesentium deserunt sunt itaque,
                blanditiis reiciendis qui? Sint iste debitis dolor maiores
                ducimus dolore soluta, facilis in quo amet. Tempore libero
                animi, facilis cupiditate ex aliquam, necessitatibus suscipit
                magni doloribus ipsam porro velit sint quia illo! Illo voluptate
                ad commodi inventore. Possimus numquam vel fuga harum tenetur
                delectus corrupti aperiam repellat consequuntur unde, ex
                voluptate ea eum sit veniam aut ad totam debitis impedit
                assumenda rerum itaque officia eos? Perferendis aliquam expedita
                commodi placeat suscipit minima. Sed temporibus dolor quae earum
                commodi illo similique assumenda corrupti aut eos, cum id
                facilis rem voluptatibus dolore, veritatis nobis? Voluptatem
                optio debitis fugiat dolores nemo id error molestiae, nisi eum
                quas laborum corporis vitae sit iusto. Vero quisquam
                necessitatibus reprehenderit eligendi cum optio laudantium.
                Magni, debitis officiis autem aliquam nulla facere, perspiciatis
                necessitatibus maxime tenetur voluptatibus laborum nesciunt.
                Officia iusto similique eius rem ab illum culpa eveniet amet aut
                beatae ratione saepe molestiae, excepturi expedita quidem
                doloremque deleniti unde ullam fugit necessitatibus dolorem quod
                praesentium quasi repellat. Praesentium velit possimus debitis
                molestias! Nam harum obcaecati eveniet officiis reiciendis! Sit
                hic nesciunt quibusdam ab repudiandae ducimus repellat eius,
                optio iure dolor earum soluta quia aliquam perspiciatis deleniti
                nam iusto. Magnam asperiores illo est. Aspernatur, ipsam
                perspiciatis? Nobis fugiat doloremque fugit praesentium,
                consequuntur temporibus, vitae officiis consequatur vero,
                debitis accusantium ut voluptatibus eos quaerat ipsam illum
                optio possimus pariatur tenetur rem eveniet sapiente est ipsa
                libero. Aut minus nisi eos ea ipsa sequi earum quisquam. Ipsam
                inventore repudiandae accusamus laudantium placeat ad illo
                impedit necessitatibus velit magnam, id, alias, quidem dolorem
                ab porro error possimus assumenda. Cum porro vero ab nulla,
                facilis, dolorem fugiat a sit esse in recusandae labore tempora
                asperiores laboriosam enim libero eos unde ipsa dolorum quos!
                Laboriosam excepturi sint voluptate in non. Reprehenderit,
                tenetur maxime voluptatum at corrupti repellat error praesentium
                nam quo neque, sapiente placeat sed excepturi architecto
                eligendi, quia recusandae facilis. Adipisci rem eveniet sunt cum
                corrupti amet quo cupiditate tenetur aliquam, fugit consequuntur
                optio dignissimos necessitatibus eaque dolorem reprehenderit eum
                iure quos? Natus quidem rem a voluptate architecto amet eaque!
                Sequi ipsum ea labore, repudiandae nisi soluta, voluptas
                quibusdam aperiam amet eveniet delectus aut nemo nam inventore
                doloremque neque aliquid fugit, quam iste nobis magni? Animi
                enim laboriosam amet magni impedit aperiam porro quaerat
                eligendi ratione sed, cupiditate sunt optio illum repudiandae,
                aspernatur dolorum provident vitae ut debitis. Illum velit
                molestias enim quaerat cumque cum, veritatis, recusandae,
                tempore possimus sit reiciendis. Quasi fugit earum doloribus
                quisquam ipsam rerum corrupti aliquam adipisci accusamus est
                sequi odit nam quo eligendi in itaque qui consectetur laboriosam
                quia reiciendis autem quae, voluptatem beatae. Tempore ipsa
                aspernatur saepe in odio qui repellat vel aliquam, pariatur,
                dolore culpa fugit ipsam quisquam commodi consequatur eligendi
                delectus eos magnam blanditiis consequuntur numquam tenetur
                debitis. Sequi maxime nisi quas dolor, culpa vero dolorum.
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </form>
      {loading && <div>...loading</div>}
    </div>
  );
};

export default Question;
